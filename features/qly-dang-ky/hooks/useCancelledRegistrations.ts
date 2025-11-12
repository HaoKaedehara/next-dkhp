"use client";
import { useEffect, useState, useMemo } from "react";
import type { GridPaginationModel, GridSortModel } from "@mui/x-data-grid";
import type { HuyDangKy } from "../types";

export function useCancelledRegistrations() {
    const [rows, setRows] = useState<HuyDangKy[]>([]);
    const [rowCount, setRowCount] = useState(0);
    const [loading, setLoading] = useState(false);

    const [query, setQuery] = useState(""); // 👈 search chung
    const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({ page: 0, pageSize: 10 });
    const [sortModel, setSortModel] = useState<GridSortModel>([{ field: "created_at", sort: "desc" }]);

    const [actualQuery, setActualQuery] = useState("");

    // Effect để handle debounced search
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setActualQuery(query);
            // Reset về trang 0 khi search
            if (query !== actualQuery) {
                setPaginationModel(prev => ({ ...prev, page: 0 }));
            }
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [query]);

    useEffect(() => {
        let off = false;
        (async () => {
            setLoading(true);
            const s = sortModel[0];
            const url = new URL("/api/cancelled-registrations", window.location.origin);
            url.searchParams.set("page", String(paginationModel.page));
            url.searchParams.set("pageSize", String(paginationModel.pageSize));
            if (actualQuery) url.searchParams.set("query", actualQuery);
            if (s) { url.searchParams.set("sortField", s.field); url.searchParams.set("sortDir", s.sort!); }
            
            try {
                const res = await fetch(url.toString(), { cache: "no-store" });
                const { rows, total } = await res.json();
                if (!off) { setRows(rows); setRowCount(total); setLoading(false); }
            } catch (error) {
                console.error("Error fetching cancelled registrations:", error);
                if (!off) { setRows([]); setRowCount(0); setLoading(false); }
            }
        })();
        return () => { off = true; };
    }, [paginationModel, sortModel, actualQuery]);

    return { rows, rowCount, loading, query, setQuery, paginationModel, setPaginationModel, sortModel, setSortModel };
}